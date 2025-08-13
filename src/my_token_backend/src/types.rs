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
    pub minting_account : Option<Principal>,
    pub airdrop_milestone : u128,
    pub transactions : Vec<Transaction>
}

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct Transaction {
    pub from: Principal,
    pub to: Principal,
    pub amount: u128,
    pub timestamp: u64,
    pub tx_type: String, // e.g., "airdrop", "transfer", "faucet"
}