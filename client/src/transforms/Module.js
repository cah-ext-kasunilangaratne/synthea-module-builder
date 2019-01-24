// @flow
import uuid from 'uuid-js';

import type { Module } from '../types/Module';
import type { State } from '../types/State';
import type { DirectTransition, DistributedTransition, ConditionalTransition, ComplexTransition, Transition } from '../types/Transition';

export function extractModule(data: any): Module {
  let name = extractName(data);
  let states = extractStates(data);
  let remarks = extractRemarks(data);
  return {name, states, remarks};
}

export function extractStates(data: any): State[] {
  if(!data){
      return []
  }
  let stateNames = Object.keys(data.states);
  return stateNames.map((name) => {
    return extractState(name, data.states[name]);
  })
}

export function extractState(name: string, state: any): State {
  let transition = extractTransition(state);
  let id = uuid.create().toString();
  let type = state.type;
  return {name, transition, id, type, ...state};
}

export function extractTransition(state: any): ?Transition {
  if(state.direct_transition) {
    return extractDirectTransition(state.direct_transition);
  }
  if(state.distributed_transition) {
    return extractDistributedTransition(state.distributed_transition);
  }
  if(state.conditional_transition) {
    return extractConditionalTransition(state.conditional_transition);
  }
  if(state.complex_transition) {
    return extractComplexTransition(state.complex_transition);
  }
  return null;
}

export function extractDirectTransition(data: any): DirectTransition {
  return {to: data, type: 'Direct'}
}

export function extractDistributedTransition(data: any): DistributedTransition {
  let transition = data.map((d) => {
    return {distribution: d.distribution, to: d.transition};
  });
  return {type: 'Distributed', transition};
}

export function extractConditionalTransition(data: any): ConditionalTransition {
  let transition = data.map((d) => {
    return {condition: d.condition, to: d.transition};
  });
  return {type: 'Conditional', transition};
}

export function extractComplexTransition(data: any): ComplexTransition {
  let transition = data.map((c) => {
    return {
      condition: c.condition,
      distributions: extractDistributedTransition(c.distributions||[]).transition,
      transition: extractDirectTransition(c.transition)
    }
  })
  return {type: 'Complex', transition};
}


export function extractRemarks(data: any):string[] {
  return (data.remarks :string[]);
}

export function extractName(data: any): string {
  return (data.name: string);
}

export function extractAttributes(module: Module): string[] {
  let attributes = Object.keys(module.states).filter((key) => {
    return module.states[key].type === 'SetAttribute' || module.states[key].type === 'Counter';
  }).map(key => (module.states[key].attribute))

  attributes = attributes.concat(Object.keys(module.states).filter((key) => {
    return !!module.states[key].assign_to_attribute
  }).map(key => (module.states[key].assign_to_attribute)))


  return [...new Set(attributes)]

}
