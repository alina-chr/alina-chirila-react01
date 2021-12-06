import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameEnded, gameStarted } from '../actions/creators/game';
import { patchGameLost, patchGameWon } from '../actions/creators/profile';
import { Authorize } from '../components/auth';
import { Creature } from '../components/profile';
import { Button } from '../components/ui';

export const GamePage = () => {
  const dispatch = useDispatch();
  const { playing } = useSelector(({ game }) => {
    return game;
  });
  useEffect(() => {
    console.log(playing ? 'Iz playing' : 'Iz not playing');
  }, [playing]);

  useEffect(() => {
    console.log('Dispatch changed');

    return () => {
      dispatch(gameEnded());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(gameStarted());
  }, [dispatch]);
  return (
    <div className="p-4 container flex mx-auto">
      <Authorize>
        <div className="w-full mb-2 md:w-8/12 flex items-center justify-around">
          {playing ? (
            <>
              <Button
                title="Win game"
                type="button"
                onClick={() => {
                  dispatch(gameEnded());
                  dispatch(patchGameWon());
                }}
              >
                Win game
              </Button>
              <Button
                title="Lose game"
                type="button"
                skin="secondaryInverted"
                onClick={() => {
                  dispatch(gameEnded());
                }}
              >
                Lose game
              </Button>
              <Button
                title="Quit"
                type="button"
                skin="secondary"
                onClick={() => {
                  dispatch(gameEnded());
                }}
              >
                Quit
              </Button>
            </>
          ) : (
            <Button
              title="Start Game"
              type="button"
              onClick={() => {
                dispatch(gameStarted());
                dispatch(patchGameLost());
              }}
            >
              Start Game
            </Button>
          )}
        </div>

        <div className="w-full md:w-4/12 flex flex-col items-center justify-center">
          <Creature></Creature>
        </div>
      </Authorize>
    </div>
  );
};

export default GamePage;
