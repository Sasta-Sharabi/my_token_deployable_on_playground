use crate::types::TokenState;
use ic_cdk::storage;
use std::cell::RefCell;

thread_local! {
    static STATE: RefCell<Option<TokenState>> =RefCell::new(None);
}

pub fn get_state() -> TokenState{
    STATE.with(|s| {
        match &*s.borrow(){
            Some(state) => state.clone(),
            None => {
                let state = match storage::stable_restore(){
                    Ok((state,)) => state,
                    Err(_) => TokenState::default()
                };
                s.replace(Some(state.clone()));
                state
            } 
        }
    })
}

pub fn save_state(state: TokenState){
    STATE.with(|s| s.replace(Some(state.clone())));
    storage::stable_save((state,)).expect("Some Error Occured while storing data to stable memory.");
}