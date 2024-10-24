/**
 * Author:
 * - Raihanullah Mehran
 *
 * Description:
 * This component creates a spinner or loader which is displayed as placeholder when fetching something from database or doing an action.
 */

import { Blocks } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <>
      <div className="flex justify-center">
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          color="#e15b64"
        />
      </div>
    </>
  );
};
