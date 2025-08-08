use ic_cdk::{ caller, query, update};
use crate::state::{get_state,save_state};
use crate::types::{Errors, UserData};
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

    save_state(state);
            
    Ok(balance - amount)
 
}


#[update]
pub fn mint(amount: u128, account : Principal) -> Result<u128, Errors> {
    let mut state = get_state();

    /*Uncomment if you want owner to only able to mint */
    // if minter() != caller() {
    //     return Err(Errors::NotTheMinter);
    // }

    let curr_balance = check_balance(account);
    state.all_users_balance.insert(account.clone(), curr_balance + amount);

    state.total_supply += amount;
    let total_supply = state.total_supply;

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
pub fn new_user(){
    let mut state = get_state();
    if state.all_user.contains_key(&caller()) {
        return;
    };
    if state.all_users_balance.contains_key(&caller()) {
        return;
    };


    state.all_user.insert(caller(), UserData{ name : "".to_string() , email : "".to_string()});
    state.all_users_balance.insert(caller(), 70000000);
    save_state(state);
}