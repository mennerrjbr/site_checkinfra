import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout.tsx"
import { Contato } from "./pages/Contato.tsx"
import { Home } from "./pages/Home.tsx"
import { NotFound } from "./pages/NotFound.tsx"
import { Planos } from "./pages/Planos.tsx"
import { Privacidade } from "./pages/Privacidade.tsx"
import { Alarmes, Cameras, ControleAcesso } from "./pages/ServicePage.tsx"
import { Sobre } from "./pages/Sobre.tsx"

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="planos" element={<Planos />} />
        <Route path="cameras" element={<Cameras />} />
        <Route path="alarmes" element={<Alarmes />} />
        <Route path="controle-de-acesso" element={<ControleAcesso />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="contato" element={<Contato />} />
        <Route path="privacidade" element={<Privacidade />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
