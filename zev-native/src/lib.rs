extern crate zeldaevent;

use wasm_bindgen::prelude::*;

use zeldaevent::zevfile::{parse_zev, write_zev, Event};

#[wasm_bindgen]
pub struct EventCollection {
    events: Vec<Event>,
}

#[wasm_bindgen]
pub fn do_parse_zev(data: &[u8]) -> Result<EventCollection, JsValue> {
    match parse_zev(data) {
        Ok(events) => Ok(EventCollection { events }),
        Err(e) => Err(format!("{:?}", e).into()),
    }
}

#[wasm_bindgen]
impl EventCollection {
    pub fn do_write_zev(&self) -> Result<Box<[u8]>, JsValue> {
        match write_zev(&self.events) {
            Ok(buf) => Ok(buf.into_boxed_slice()),
            Err(e) => Err(format!("{:?}", e).into()),
        }
    }

    pub fn get_event_count(&self) -> usize {
        self.events.len()
    }

    pub fn get_event_name(&self, idx: usize) -> String {
        self.events
            .get(idx)
            .map_or("", |e| e.get_name())
            .to_string()
    }

    pub fn get_dot_by_name(&self, name: String) -> Result<String, JsValue> {
        self.events
            .iter()
            .find(|e| e.get_name() == &name)
            .map(|e| e.to_dot_file())
            .ok_or_else(|| JsValue::from_str("event not found"))
            
    }

    pub fn get_json_by_name(&self, name: String) -> Result<String, JsValue> {
        self.events
            .iter()
            .find(|e| e.get_name() == &name)
            .map_or_else(
                || Err(JsValue::from_str("event not found")),
                |e| e.to_json().map_err(|err| JsValue::from(err.to_string())),
            )
    }
}
