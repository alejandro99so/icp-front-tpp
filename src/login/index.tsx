// "use client";

import { useState, FormEvent } from 'react';
import './login.module.css';
// import styles from "../../styles/login.module.css";
import useActor from '../hooks/useActor';
import CryptoJS from 'crypto-js';
import Modal, { ITypeMessage } from '../modal';
// import { privateKeyToAccount } from "viem/accounts";
// import { useRouter } from "next/navigation";

export default function Login() {
  // const [server] = useActor();

  //   const secretWord = "mi_clave_secreta_123";
  const [isSelected, setIsSelected] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<ITypeMessage>('info');
  const [messageModal, setMessageModal] = useState('');
  //   const whiteList = ["prueba@mail.com"];
  //   const router = useRouter();

  //   const deCypher = (value: string) => {
  //     const bytes = CryptoJS.AES.decrypt(value, secretWord);
  //     const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  //     return decryptedData;
  //   };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = String(formData.get('password'));
    console.log({ email, password });
    const newPassword = String(CryptoJS.SHA256(password));
    console.log({ newPassword });
    try {
      if (isNewAccount) {
        const dni = formData.get('dni');
        console.log({ dni });
        const request = await fetch('http://localhost:3001/new-wallet');
        const { cipherAddress, cipherPrivateKey } = await request.json();
        console.log({ cipherAddress, cipherPrivateKey });
        const result = useActor();
        if (result instanceof Error) {
          console.error(result);
        } else {
          const [server] = result;
          const validation = await server.setAccounts(
            email,
            newPassword,
            cipherAddress,
            cipherPrivateKey,
            dni,
          );
          console.log({ validation });
          alert(validation);
          if (validation == 'USER_CREATED') {
            setTypeModal('success');
            setMessageModal('Usuario creado con éxito');
            setIsModalOpen(true);
          } else {
            setTypeModal('error');
            setMessageModal('Error creando usuario');
            setIsModalOpen(true);
          }
        }
      } else {
        //         console.log({ email, newPassword });
        //         const validation = await server.validateAccounts(email, newPassword);
        //         console.log({ validation, email, newPassword });
        //         if (validation.length == 128) {
        //           setTypeModal("success");
        //           const privateKey = deCypher(validation) as `0x${string}`;
        //           const pubKey = privateKeyToAccount(privateKey).address;
        //           sessionStorage.setItem("pubKey", pubKey);
        //           sessionStorage.setItem("privKey", validation);
        //           console.log({ privateKey, pubKey });
        //           setMessageModal("Usuario continua con éxito");
        //           setIsModalOpen(true);
        //           if (whiteList.includes(String(email))) {
        //             router.push("/dashboard");
        //           } else {
        //             router.push("/verify");
        //           }
        //         } else {
        //           setTypeModal("error");
        //           setMessageModal("Error de correo o contraseña");
        //           setIsModalOpen(true);
        //         }
      }
    } catch (ex) {
      if (ex instanceof Error) {
        console.error(ex.message);
      } else {
        console.error('Unknown error', ex);
      }
    }
  };

  return (
    <div>
      {!isSelected && (
        <div>
          <form className="email_form" onSubmit={onSubmit}>
            <div className="email_form_row">
              <label>Digita tu correo: </label>
              <input type="text" name="email" />
            </div>
            <div className="email_form_row">
              <label>Digita tu contraseña: </label>
              <input type="password" name="password" />
            </div>
            {isNewAccount && (
              <div className="email_form_row">
                <label>Digita tu DNI: </label>
                <input type="text" name="dni" />
              </div>
            )}
            <br />
            <button className="email_form_button" type="submit">
              {isNewAccount ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </button>
            <br />
            <div
              className="checkbox"
              onClick={() => setIsNewAccount(!isNewAccount)}
            >
              <input
                className="checkbox_checker"
                type="checkbox"
                checked={isNewAccount}
              />
              <label>Quiero crear mi cuenta</label>
            </div>
          </form>
        </div>
      )}
      <div className="checkbox" onClick={() => setIsSelected(!isSelected)}>
        <input
          className="checkbox_checker"
          type="checkbox"
          checked={isSelected}
        />
        <label>Soy usuario avanzado y quiero usar mi propia wallet</label>
      </div>
      <div className="checkbox_wallet_connect">
        {isSelected && <w3m-button />}
      </div>
    </div>
  );
}
