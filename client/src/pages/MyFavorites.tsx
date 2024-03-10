import { useAuth0 } from "@auth0/auth0-react";


export const MyFavorites = () => {



  const { isAuthenticated } = useAuth0();


  return (
    <div className="hiddenSearch">
      {!isAuthenticated && (
        <>
         <span>Log in to show favorite images</span>
        </>
      )}
      {isAuthenticated && (
        <>
          <h4>Here are your favorite images</h4>

        </>


      )}
    </div>
  );
}