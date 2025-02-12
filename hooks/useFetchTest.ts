import { useEffect } from "react";
import api from "@/lib/api"; // Importamos la instancia de Axios

export const useFetchTest = () => {
  useEffect(() => {

    console.log("✅ Hook useFetchTest ejecutado");

    api.get("/test") // Esto hará la petición a "/api/test"
      .then(response => {
        console.log("✅ Respuesta del backend:", response.data);
      })
      .catch(error => {
        console.error("❌ Error al conectar con el backend:", error);
      });
  }, []);
};
