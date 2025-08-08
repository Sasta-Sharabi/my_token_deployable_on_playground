use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Serialize, Clone,Debug)]
pub enum Errors{
    InsufficientFunds {balance : u128},
    ReceiverSameAsSender,
    ZeroTransfer,
    MinterNotSet,
    NotTheMinter
}

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct UserData {
    pub name: String,
    pub email : String
} 

#[derive(CandidType, Deserialize,Serialize, Clone, Default)]
pub struct TokenState{
    pub total_supply : u128,
    pub all_user : HashMap<Principal,UserData>,
    pub all_users_balance : HashMap<Principal,u128>,
    pub minting_account : Option<Principal>  
}