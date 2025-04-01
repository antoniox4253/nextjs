import { mobileStyles as styles } from "@/components/ui/base-styles";

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Bienvenido a Realm of Valor
      </h1>
      
      <div className="space-y-4">
        <button className={styles.button}>
          <WorldcoinIcon className="w-5 h-5 mr-2" />
          Conectar con Worldcoin
        </button>
        
        <button className={styles.button}>
          <GoogleIcon className="w-5 h-5 mr-2" />
          Conectar con Google
        </button>
      </div>
    </div>
  );
} 