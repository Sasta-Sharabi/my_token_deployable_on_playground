use ic_cdk::{query , update , caller};
use crate::state::{get_state};
use crate::types::UserData;
use crate::token::*;
use candid::Principal;
use crate::utils::{convert_from_string_to_principal,convert_from_string_to_u128};


#[query]
pub fn get_all_users() -> Vec<(String , String )>{
    let state = get_state();
    state.all_users_balance.iter().map(|(p,b)| (p.to_text(), b.to_string())).collect()
}

#[query]
pub fn get_token_metadata() -> (String,String,String,String){
    (token_name() , token_symbol() , total_supply().to_string() , minter().to_text())
}

#[query]
pub fn get_profile_details() -> (String,String,String,String){
    let state = get_state();

    let user = match state.all_user.get(&caller()).cloned(){
        None => UserData{
            name: "".to_string(),
            email: "".to_string()
        },
        Some(user) => user
    };

    let balance = check_balance(caller());

    (caller().to_text(), user.name , user.email , balance.to_string())
}

#[query]
pub fn check_balance_of(user : String) -> String{
    let user = Principal::from_text(user).unwrap();
    check_balance(user).to_string()
}

#[update]
pub fn transfer_to(receiver: String, amount : String) -> String{

    match transfer(convert_from_string_to_principal(receiver), convert_from_string_to_u128(amount)){
        Ok(_a)=> "Success".to_string(),
        Err(_)=> "Failed".to_string()
    }
}
    
#[update]
pub fn mint_tokens(amount : String, account : String) -> String {
    match mint(convert_from_string_to_u128(amount), convert_from_string_to_principal(account)){
        Ok(_a)=> "Success".to_string(),
        Err(_)=> "Failed".to_string()
    }
}

#[query]
pub fn get_header_details() -> (String,String) {
    (caller().to_text() , check_balance_of(caller().to_text()))
}

#[update]
pub fn update_profile_details(username: String, email: String){
    update_user_details(username, email);
}

#[update]
pub fn register_user(){
    new_user();
}
