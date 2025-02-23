
import AnimatedLogo from "./AnimatedLogo";
import { LoadingIcon } from './LoadingIcon'
import styles from './styles.module.css'

export function Loading() {
  return (
    <div className={styles.container}>
      <LoadingIcon />
    </div>
  )
}




export default function App() {
  return (
    <div className="styles.container">
      <AnimatedLogo />
    </div>
  );
}
