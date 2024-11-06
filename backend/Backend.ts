import { IDL, query, update } from 'azle';

export default class {
  emails: string[] = [];
  passwords: string[] = [];
  pubKeys: string[] = [];
  privKeys: string[] = [];
  docIds: string[] = [];

  @update([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text], IDL.Text)
  setAccounts(
    email: string,
    password: string,
    pubKey: string,
    privKey: string,
    docId: string,
  ): string {
    const index = this.emails.indexOf(email);
    if (index == -1) {
      this.emails.push(email);
      this.passwords.push(password);
      this.pubKeys.push(pubKey);
      this.privKeys.push(privKey);
      this.docIds.push(docId);
      return 'USER_CREATED';
    }
    return 'USER_EXIST_ALREADY';
  }

  @query([IDL.Text, IDL.Text], IDL.Text)
  validateAccounts(email: string, password: string): string {
    const index = this.emails.indexOf(email);
    if (index == -1) {
      return 'ACCOUNT_DOESNT_EXIST';
    }
    if (this.passwords[index] != password) {
      return 'EMAIL_OR_PASSWORD_DOESNT_MATCH';
    }
    return this.privKeys[index];
  }

  @query([IDL.Text], IDL.Text)
  validatePubKey(privKey: string): string {
    const index = this.privKeys.indexOf(privKey);
    if (index == -1) {
      return 'ACCOUNT_DOESNT_EXIST';
    }
    return this.pubKeys[index];
  }

  @query([IDL.Text], IDL.Text)
  validateDocId(privKey: string): string {
    const index = this.privKeys.indexOf(privKey);
    if (index == -1) {
      return 'ACCOUNT_DOESNT_EXIST';
    }
    return this.docIds[index];
  }
}
