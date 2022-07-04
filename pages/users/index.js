import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

export default function Users() {

    const[users,setUsers]= useState()


    // after the page load, the users(above) get render, when try to render the page then will come to here to try call Api//
    useEffect(()=>{
     if(!users){
        const getData = async() => {
            const res = await fetch ("/api/getUsers")
            const data = await res.json()
    
            setUsers(data);
       };
       getData();
     }



    },[users]);

    const handleDelete = useCallback(async (_id) => {
  
        await fetch("/api/deleteUser?_id=" + _id, {
          method: "DELETE"
        });
    

        setUsers(null);
      }, []);

  return (
    <div className="container">
      <section className="section">
        <div className="columns">
          <div className="column">
            <Link passHref href="/users/create">
              <button className="button is-dark">create</button>
            </Link>
          </div>
        </div>
        {!users && <span>loading...</span>}
        <div className="columns is-multiline">
          {users?.map(({ name, country, _id }) => (
            <div key={_id} className="column is-6">
              <div className="card">
                <div className="card-content">
                  <div className="columns is-vcentered">
                    <div className="column">
                      <b>{name}</b>
                      <p>{country}</p>
                    </div>
                    <div className="column is-narrow">
                      <div className="buttons">
                        <Link passHref href={"/users/update/" + _id}>
                          <button
                    
                            className="button is-dark"
                          >
                            update
                          </button>
                        </Link>
                        <button
                          className="button is-danger"
                          onClick={() => handleDelete(_id)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}