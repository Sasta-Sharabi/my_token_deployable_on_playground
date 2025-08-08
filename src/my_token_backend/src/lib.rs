mod state;
mod types;
mod token;
mod user;
mod utils;

use std::collections::HashMap;

use ic_cdk::{ caller, init, post_upgrade, pre_upgrade, storage};
use crate::state::{get_state,save_state};
use crate::types::{TokenState,UserData};
use crate::utils::{convert_from_string_to_principal};



#[pre_upgrade]
fn pre_upgrade() {  
    let state = get_state();
    save_state(state);
}



#[post_upgrade]
fn post_upgrade() {
    let state: TokenState = match storage::stable_restore() {
        Ok((state,)) => state,
        Err(_) => TokenState::default(), 
    };
    
    save_state(state);
}

#[init]
fn init(){

    let minter = caller();

    let admin_details = UserData{
        name : "Admin".to_string(),
        email : "minter404@gmail.com".to_string()
    };

    let mut all_user = HashMap::new();
    all_user.insert(minter.clone(), admin_details);

    let mut all_user_balance = HashMap::new();
    all_user_balance.insert(minter.clone(),90000000000);

    let id1 = convert_from_string_to_principal("pyq3t-asn73-vg45r-dnltz-whebg-hujyt-tlvhp-wqeno-6f3zy-jghzt-lae".to_string());
    all_user.insert(id1.clone(),UserData{name : "FakeId1".to_string(), email : "FakeId1@gmail.com".to_string()});
    all_user_balance.insert(id1.clone(),5000000000);

    let id2 = convert_from_string_to_principal("dt2iq-xbhe7-acf5e-tau4p-qzsyl-n7476-ghw2c-rtfux-q2uiz-ja4tf-gae".to_string());
    all_user.insert(id2.clone(),UserData{name : "FakeId2".to_string(), email : "FakeId2@gmail.com".to_string()});
    all_user_balance.insert(id2.clone(),5000000000);


    let state = TokenState {
        total_supply: 100000000000,
        all_user: all_user,
        all_users_balance : all_user_balance,
        minting_account: Some(minter),  
    };

    save_state(state);

}