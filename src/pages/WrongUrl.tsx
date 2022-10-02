import { FC } from "react";
import { useHistory } from "react-router-dom";

const WrongUrl: FC = () => {
  const history = useHistory();
  return (
    <main id="wrong-url">
      <p>Are you sure you visited the correct URL? Check again</p>
      <button
        onClick={() => {
          history.replace("/");
        }}
      >
        Home
      </button>
    </main>
  );
};

export default WrongUrl;
