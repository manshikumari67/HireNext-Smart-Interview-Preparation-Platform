import { useEffect, useDispatch, useSelector } from 'react-redux';
import { decrementTime, finishQuiz } from '../store/store';

export const useQuizTimer = () => {
  const dispatch = useDispatch();
  const { timeLeft, isActive } = useSelector(state => state.quiz);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, dispatch]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timePercentage = (timeLeft / 300) * 100;
  const timeStatus = timePercentage > 33 ? 'safe' : timePercentage > 10 ? 'warning' : 'danger';

  return { formatTime, timePercentage, timeStatus };
};
