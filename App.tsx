import { useToast } from "./useToast";
import styles from "./styles/common.module.css";

function App() {
  const { toast } = useToast();

  const handleDefaultToast = () => {
    toast({
      variant: "default",
      message: "Default toasted!",
    });
  };

  const handleSuccessToast = () => {
    toast({
      variant: "success",
      message: "Successfully toasted!",
      duration: 5000,
    });
  };

  const handleCustomToast = () => {
    toast({
      render: () => <div>Hello World</div>,
    });
  };

  return (
    <div className={`grow flex flex-col bg-[#FEFBEF] ${styles.main}`}>
      <div>
        <h1>Example</h1>
        <div className={styles.buttonLayer}>
          <button onClick={handleDefaultToast}>Default</button>
          <button onClick={handleSuccessToast}>Success</button>
          <button onClick={handleCustomToast}>Custom</button>
        </div>
      </div>
    </div>
  );
}

export default App;