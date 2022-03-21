extern crate zeldaevent;

use std::fmt::Write;

use wasm_bindgen::prelude::*;

use zeldaevent::zevfile::{parse_zev, write_zev, Event, WaitFor};

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

    pub fn get_event_viewer(&self, name: String) -> Result<EventViewer, JsValue> {
        self.events
            .iter()
            .find(|e| e.get_name() == &name)
            .map(|e| e.clone().into())
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

enum ViewerSelection {
    None,
    Step(u16, u16),
}

#[wasm_bindgen]
pub struct EventViewer {
    event: Event,
    selection: ViewerSelection,
}

impl From<Event> for EventViewer {
    fn from(e: Event) -> Self {
        EventViewer {
            event: e,
            selection: ViewerSelection::None,
        }
    }
}

#[wasm_bindgen]
impl EventViewer {
    pub fn to_dot_string(&self) -> String {
        let mut out = String::new();
        writeln!(out, "digraph {{\nlabel=\"{}\"", self.event.get_name()).unwrap();
        for (actoridx, actor) in self.event.get_actors().iter().enumerate() {
            writeln!(out, "subgraph cluster_{} {{", actoridx).unwrap();
            writeln!(out, "label=\"{}: {}\"", actoridx, actor.name).unwrap();
            for (stepidx, step) in actor.get_steps().iter().enumerate() {
                let mut bgcolor = "black";
                if let ViewerSelection::Step(selected_actor, selected_step) = self.selection {
                    if actoridx == usize::from(selected_actor)
                        && stepidx == usize::from(selected_step)
                    {
                        bgcolor = "red";
                    }
                }
                writeln!(
                    out,
                    "action_{}_{} [label=\"{}: {}\";color={};id=a_{}_{}]",
                    actoridx, stepidx, stepidx, step.long_name, bgcolor, actoridx, stepidx
                )
                .unwrap();
                if stepidx > 0 {
                    writeln!(
                        out,
                        "action_{actoridx}_{prevstep} -> action_{actoridx}_{thisstep}",
                        actoridx = actoridx,
                        prevstep = stepidx - 1,
                        thisstep = stepidx
                    )
                    .unwrap();
                }
            }
            writeln!(out, "}}").unwrap();
        }
        for WaitFor {
            waiting,
            waiting_on,
        } in self.event.wait_fors.iter()
        {
            writeln!(out, "action_{waited_on_actoridx}_{waited_on_stepidx} -> action_{waiting_actoridx}_{waiting_stepidx}",
                waited_on_actoridx=waiting_on.actor_idx,
                waiting_actoridx=waiting.actor_idx,
                waited_on_stepidx=waiting_on.step_idx,
                waiting_stepidx=waiting.step_idx).unwrap();
        }
        writeln!(out, "}}").unwrap();
        out
    }

    pub fn get_details_title(&self) -> Option<String> {
        match self.selection {
            ViewerSelection::None => None,
            ViewerSelection::Step(..) => Some("Step".into()),
        }
    }

    pub fn get_details(&self) -> Option<String> {
        match self.selection {
            ViewerSelection::None => None,
            ViewerSelection::Step(actorindex, stepindex) => self.event.get_actors()
                .get(usize::from(actorindex))
                .and_then(|a| a.get_steps().get(usize::from(stepindex)))
                .and_then(|s| serde_json::to_string_pretty(s).ok()),
        }
    }

    pub fn set_select_none(&mut self) {
        self.selection = ViewerSelection::None;
    }

    pub fn set_select_step(&mut self, actorindex: usize, stepindex: usize) {
        if let Ok(aidx) = u16::try_from(actorindex) {
            if let Ok(sidx) = u16::try_from(stepindex) {
                self.selection = ViewerSelection::Step(aidx, sidx);
            }
        }
    }
}
