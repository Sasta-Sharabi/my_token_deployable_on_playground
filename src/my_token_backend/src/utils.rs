use candid::Principal;
use ic_cdk::caller;

pub fn convert_from_string_to_u128(amount : String) -> u128{
    match amount.parse::<u128>() {
        Ok(num) => num,
        Err(_)=> 0
    }
}

pub fn convert_from_string_to_principal(account : String) -> Principal{
    match Principal::from_text(account){
        Ok(p) => p,
        Err(_) => caller()
    }
}

