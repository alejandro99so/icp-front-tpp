import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'setAccounts' : ActorMethod<[string, string, string, string, string], string>,
  'validateAccounts' : ActorMethod<[string, string], string>,
  'validateDocId' : ActorMethod<[string], string>,
  'validatePubKey' : ActorMethod<[string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
