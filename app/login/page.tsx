"use client";

import { useState } from "react";
import { auth } from '@/lib/firebase/clientApp';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuário registrado:', userCredential.user);
            // Aqui você pode fazer redirecionamento ou limpar formulário
        } catch (error: any) {
            console.error('Erro ao registrar usuário:', error.message);
            // Mostre mensagem de erro para o usuário
        }
    }


    const handleLogin = async () => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });

        window.location.href = "/dashboard";
    };

    async function handleSignOut() {
        try {
            await signOut(auth);

            await fetch("/api/logout", { method: "POST" });

            window.location.href = "/login";
        } catch (error: any) {
            console.error("Erro ao deslogar:", error.message);
        }
    }



    return (
        <div>
            <h1>Login</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
            <button onClick={handleLogin}>Entrar</button>
            <button onClick={handleSignUp}>Registrar</button>
            <button onClick={handleSignOut}>Sair</button>
        </div>
    );
}
