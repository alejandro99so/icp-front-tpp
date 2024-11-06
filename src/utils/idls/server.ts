import { IDL } from '@dfinity/candid';

export const idlFactory: IDL.InterfaceFactory = ({ IDL: idl }) => {
  return idl.Service({
    setAccounts: idl.Func(
      [idl.Text, idl.Text, idl.Text, idl.Text, idl.Text],
      [idl.Text],
      [],
    ),
    validateAccounts: idl.Func([idl.Text, idl.Text], [idl.Text], ['query']),
    validateDocId: idl.Func([idl.Text], [idl.Text], ['query']),
    validatePubKey: idl.Func([idl.Text], [idl.Text], ['query']),
  });
};

export const init = ({ IDL: idl }: { IDL: typeof IDL }) => {
  console.log({ idl });
  return [];
};
