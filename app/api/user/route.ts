import { connectToDB } from "@/utils/db";
    import Auth from "@/app/api/models/Auth";
    import User from "@/app/api/models/User";

    // 📌 Manejo de solicitudes POST para verificar usuario
    export async function POST(req: Request) {
    await connectToDB();
    const { userId } = await req.json();

    if (!userId) {
        return new Response(JSON.stringify({ error: "Falta userId" }), { status: 400 });
    }

    // 📌 Buscar si el usuario ya está registrado en el juego
    const user = await User.findOne({ userId });

    if (user) {
        console.log("✅ Usuario registrado:", user);
        return new Response(JSON.stringify({ registered: true, user }), { status: 200 });
    }

    // 📌 Si no está en User, verificamos si está autenticado en Auth
    const authUser = await Auth.findOne({ userId });

    if (authUser) {
        console.log("🔍 Usuario autenticado, pero no registrado en el juego.");
        return new Response(JSON.stringify({ registered: false }), { status: 200 });
    }

    console.log("❌ Usuario no autenticado. Debe iniciar sesión.");
    return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
    }
