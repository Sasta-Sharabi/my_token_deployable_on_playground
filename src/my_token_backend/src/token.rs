use ic_cdk::{ caller, query, update};
use crate::state::{get_state,save_state};
use crate::types::{Errors, Transaction, UserData};
use crate::utils::convert_from_string_to_principal;
use candid::Principal;

#[query]
pub fn token_name() -> String {
    "CoreX".to_string()
}

#[query]
pub fn token_symbol() -> String {
    "CRX".to_string()
}

#[query]
pub fn total_supply() -> u128 {
    let state = get_state();
    state.total_supply
}

#[query]
pub fn check_balance(account : Principal) -> u128 {
    let state = get_state();
    match state.all_users_balance.get(&account).cloned() {
        None=> 0,
        Some(num) => num
    }
}

#[query]
pub fn minter() -> Principal{
    match get_state().minting_account {
        None => caller(),
        Some(num) => num
    }
}


#[update]
pub fn transfer(receiver : Principal, amount : u128) -> Result<u128,Errors>{

    if amount == 0 {
        return Err(Errors::ZeroTransfer);
    };

    if receiver == caller() {
        return Err(Errors::ReceiverSameAsSender);
    }

    let mut state = get_state();
    let balance = check_balance(caller());

    
    if balance < amount {
        return Err(Errors::InsufficientFunds { balance: balance });
    }
            
    state.all_users_balance.insert(caller(), balance - amount);   
    let receiver_balance = check_balance(receiver);      
    state.all_users_balance.insert(receiver.clone(), receiver_balance + amount);

    state.transactions.push(Transaction{
        from : caller(),
        to : receiver ,
        amount ,
        timestamp : ic_cdk:: api::time(),
        tx_type : "Transfer".to_string()
    });

    save_state(state);
            
    Ok(balance - amount)
 
}


#[update]
pub fn mint(amount: u128, account : Principal) -> Result<u128, Errors> {
    let mut state = get_state();

    /*Uncomment if you want owner to only able to mint */
    if minter() != caller() {
        return Err(Errors::NotTheMinter);
    }

    if amount == 0{
        return Err(Errors::ZeroTransfer);
    }
    
    let curr_balance = check_balance(account);
    state.all_users_balance.insert(account.clone(), curr_balance + amount);

    state.total_supply += amount;
    let total_supply = state.total_supply;

    state.transactions.push(Transaction{
        from : convert_from_string_to_principal("".to_string()),
        to : account ,
        amount ,
        timestamp : ic_cdk::api::time(),
        tx_type : "Mint".to_string()
    });


    save_state(state);
    
    Ok(total_supply) 
}

#[update]
pub fn update_user_details(username: String, email: String){
    let mut state = get_state();
    state.all_user.insert(caller(), UserData{ name : username , email : email});
    save_state(state);
}

#[update]
pub fn new_user() {
    let mut state = get_state();

    // Prevent duplicate registration
    if state.all_user.contains_key(&caller()) || state.all_users_balance.contains_key(&caller()) {
        return;
    }

    // Add the new user
    state.all_user.insert(caller(), UserData {
        name: "".to_string(),
        email: "".to_string()
    });
    state.all_users_balance.insert(caller(), 0);

    let total_users = state.all_user.len() as u128;

    // Check if we hit the airdrop milestone
    if total_users == state.airdrop_milestone {
        let airdrop_amount: u128 = 60_000;
        let total_airdrop_tokens = airdrop_amount * total_users;

        // ✅ Always mint new tokens for the airdrop
        state.total_supply += total_airdrop_tokens;

        // Credit minted tokens to minter
        let minter_balance = check_balance(minter()) + total_airdrop_tokens;
        state.all_users_balance.insert(minter(), minter_balance);

        // Deduct from minter and distribute to all users
        state.all_users_balance.insert(minter(), minter_balance - total_airdrop_tokens);
        for user in state.all_user.keys() {
            let curr_balance = check_balance(*user);
            state.all_users_balance.insert(*user, curr_balance + airdrop_amount);
            state.transactions.push(Transaction{
                from : convert_from_string_to_principal("".to_string()),
                to : *user ,
                amount : airdrop_amount ,
                timestamp : ic_cdk::api::time(),
                tx_type : "AirDrop".to_string()
            });
        }

        // Set the next milestone
        state.airdrop_milestone *= 2;
    }

    save_state(state);
}



#[update]
pub fn add_faucets(){
    let mut state = get_state();

    let curr_balance = check_balance(caller());
    state.all_users_balance.insert(caller(),curr_balance + 100);
    
    let minter = match state.minting_account{
        None=> caller(),
        Some(p) => p
    };

    let minter_balance = check_balance(minter);
    state.all_users_balance.insert(minter,minter_balance - 100);

    state.transactions.push(Transaction{
        from : minter,
        to : caller() ,
        amount : 100 ,
        timestamp : ic_cdk::api::time(),
        tx_type : "Faucets".to_string()
    });

    save_state(state);
}

#[query]
pub fn get_transactions_for(account: Principal) -> Vec<Transaction> {
    let state = get_state();
    state.transactions
        .iter()
        .filter(|tx| tx.from == account || tx.to == account) // transactions involving the account
        .cloned()
        .collect()
}

