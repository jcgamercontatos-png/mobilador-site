"use client";
import { useState, useEffect } from "react";

type License = {
  id: string;
  username: string;
  displayName: string | null;
  licenseType: string;
  licenseDays: number;
  deviceId: string | null;
  isValid: boolean;
  createdAt: string;
};

export default function ChavesPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [form, setForm] = useState({ username: "", password: "", displayName: "", licenseType: "permanent", licenseDays: 30 });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchLicenses() {
    const res = await fetch("/api/licenses", { headers: { authorization: `Bearer ${password}` } });
    if (res.ok) setLicenses(await res.json());
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggedIn(true);
    await fetchLicenses();
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/licenses", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${password}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Chave criada! Usuário: ${data.username}, Senha: ${data.password}`);
      setForm({ username: "", password: "", displayName: "", licenseType: "permanent", licenseDays: 30 });
      await fetchLicenses();
    } else {
      setMessage(`Erro: ${data.error}`);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Deletar esta licença?")) return;
    await fetch(`/api/licenses?id=${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${password}` },
    });
    await fetchLicenses();
  }

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: "100px auto", padding: 20, background: "#111", borderRadius: 12, border: "1px solid #333" }}>
        <h1 style={{ color: "#00d4ff", textAlign: "center", marginBottom: 20 }}>MOBILADOR</h1>
        <p style={{ color: "#9e9e9e", textAlign: "center", marginBottom: 20 }}>Painel de Licenças</p>
        <form onSubmit={handleLogin}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha de admin" required style={{ width: "100%", padding: 10, background: "#0d0d0d", border: "1px solid #333", borderRadius: 8, color: "#e0e0e0", marginBottom: 12 }} />
          <button type="submit" style={{ width: "100%", padding: 10, background: "#00d4ff", color: "#0d0d0d", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>ENTRAR</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ color: "#00d4ff", textAlign: "center", marginBottom: 4 }}>MOBILADOR</h1>
      <p style={{ color: "#9e9e9e", textAlign: "center", marginBottom: 24 }}>Painel de Licenças</p>

      {message && (
        <div style={{ background: message.includes("Erro") ? "#ff408133" : "#00c85333", color: message.includes("Erro") ? "#ff4081" : "#00c853", padding: 12, borderRadius: 8, marginBottom: 16, textAlign: "center" }}>
          {message.split("\n").map((l, i) => <div key={i}>{l}</div>)}
        </div>
      )}

      <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h2 style={{ color: "#00d4ff", marginBottom: 16 }}>Criar Nova Licença</h2>
        <form onSubmit={handleCreate}>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required style={{ flex: 1, padding: 10, background: "#0d0d0d", border: "1px solid #333", borderRadius: 8, color: "#e0e0e0" }} />
            <input type="text" placeholder="Senha" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ flex: 1, padding: 10, background: "#0d0d0d", border: "1px solid #333", borderRadius: 8, color: "#e0e0e0" }} />
          </div>
          <input type="text" placeholder="Nome de exibição (opcional)" value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} style={{ width: "100%", padding: 10, background: "#0d0d0d", border: "1px solid #333", borderRadius: 8, color: "#e0e0e0", marginBottom: 12 }} />
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <select value={form.licenseType} onChange={e => setForm({ ...form, licenseType: e.target.value })} style={{ flex: 1, padding: 10, background: "#0d0d0d", border: "1px solid #333", borderRadius: 8, color: "#e0e0e0" }}>
              <option value="permanent">Permanente</option>
              <option value="temporary">Temporária (dias)</option>
            </select>
            {form.licenseType === "temporary" && (
              <input type="number" value={form.licenseDays} onChange={e => setForm({ ...form, licenseDays: Number(e.target.value) })} min={1} style={{ width: 100, padding: 10, background: "#0d0d0d", border: "1px solid #333", borderRadius: 8, color: "#e0e0e0" }} />
            )}
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: 10, background: "#00d4ff", color: "#0d0d0d", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer", opacity: loading ? 0.5 : 1 }}>
            {loading ? "CRIANDO..." : "CRIAR LICENÇA"}
          </button>
        </form>
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, padding: 24 }}>
        <h2 style={{ color: "#00d4ff", marginBottom: 16 }}>Licenças ({licenses.length})</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ color: "#9e9e9e", borderBottom: "1px solid #333" }}>
              <th style={{ padding: 8, textAlign: "left" }}>Usuário</th>
              <th style={{ padding: 8, textAlign: "left" }}>Nome</th>
              <th style={{ padding: 8, textAlign: "left" }}>Tipo</th>
              <th style={{ padding: 8, textAlign: "left" }}>Dispositivo</th>
              <th style={{ padding: 8, textAlign: "left" }}>Criado</th>
              <th style={{ padding: 8, textAlign: "left" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((lic) => (
              <tr key={lic.id} style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: 8 }}>{lic.username}</td>
                <td style={{ padding: 8 }}>{lic.displayName}</td>
                <td style={{ padding: 8 }}>
                  <span style={{ background: lic.licenseType === "permanent" ? "#00d4ff33" : "#ffab0033", color: lic.licenseType === "permanent" ? "#00d4ff" : "#ffab00", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: "bold" }}>
                    {lic.licenseType === "permanent" ? "Permanente" : "Temporária"}
                  </span>
                </td>
                <td style={{ padding: 8, fontSize: 10, color: lic.deviceId ? "#ffab00" : "#9e9e9e" }}>{lic.deviceId ? "Vinculado" : "Livre"}</td>
                <td style={{ padding: 8, fontSize: 11, color: "#9e9e9e" }}>{new Date(lic.createdAt).toLocaleDateString("pt-BR")}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleDelete(lic.id)} style={{ background: "#ff4081", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>Excluir</button>
                </td>
              </tr>
            ))}
            {licenses.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 20, textAlign: "center", color: "#9e9e9e" }}>Nenhuma licença criada</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
