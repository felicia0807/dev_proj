import { useCallback, useState } from "react";
import Link from "next/link";

export default function UserForm({
  name = "",
  country = "",
  isLoading = false,
  onSave
}) {
  const [user, setUser] = useState({
    name,
    country
  });

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setUser({
        ...user,
        [name]: value
      });
    },
    [user]
  );

  return (
    <div className="container">
      <section className="section">
        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label htmlFor="" className="label">
                Name *
              </label>
              <div className="control">
                <input
                  disabled={isLoading}
                  name="name"
                  type="text"
                  className="input"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="" className="label">
                Country *
              </label>
              <div className="control">
                <div className="select">
                  <select
                    disabled={isLoading}
                    name="country"
                    value={user.country}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      Select country
                    </option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Japan">Japan</option>
                    <option value="Philipines">Philipines</option>
                    <option value="Indonesia">Indonesia</option>
                  </select>
                </div>
              </div>
            </div>

            <br />

            <div className="field is-grouped">
              <div className="control">
                <button
                  disabled={isLoading || !user.country || !user.name}
                  className="button is-dark"
                  onClick={() => onSave(user)}
                >
                  save
                </button>
              </div>
              <div className="control">
                <Link passHref href="/users">
                  <button className="button is-default">back</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}