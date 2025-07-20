import BeatLoader from 'react-spinners/BeatLoader';
import { motion } from 'framer-motion';
import theme from '@styles/theme';

interface PageLoadingProps {
  loading: boolean;
}
export function PageLoading({ loading }: PageLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ height: 'calc(100vh - 88px)' }}
      className="h-screen w-full flex justify-center items-center"
    >
      <BeatLoader color={theme.color.pink300} loading={loading} />
    </motion.div>
  );
}
