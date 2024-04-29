"use client";

import { ExportData } from "@/types/ExportData";
import { useEffect, useState } from "react";
import { addRows, getRows } from "./action";

export default function HomePage() {
  // const [title, setTitle] = useState("");
  const [rows, setRows] = useState<ExportData[]>([]);
  const [selectedRows, setSelectedRows] = useState<ExportData[] | null>(null);

  const fetchData = async () => {
    // const fetchedTitle = await init();
    // setTitle(fetchedTitle);
    const fetchedRows = await getRows();
    setRows(fetchedRows);
  };

  const addRecord = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setRows([...rows, data as ExportData]);
    (document.getElementById("add_new_modal") as HTMLDialogElement)?.close();
  };

  const selectAllRows = () => {
    if (selectedRows === null) {
      setSelectedRows(rows);
    } else {
      setSelectedRows(null);
    }
  };

  const selectRow = (row: ExportData) => {
    if (selectedRows === null) {
      setSelectedRows([row]);
    } else {
      const index = selectedRows.findIndex((r) => r.code === row.code);
      if (index === -1) {
        setSelectedRows([...selectedRows, row]);
      } else {
        setSelectedRows([
          ...selectedRows.slice(0, index),
          ...selectedRows.slice(index + 1),
        ]);
      }
    }
  };

  const exportData = async (data: ExportData[] | null) => {
    if (data === null) {
      return;
    }
    await addRows(data);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 flex flex-col gap-4 mx-auto max-w-6xl container items-center min-h-screen">
      <h1 className="text-3xl mb-8 font-bold text-green-600">
        Google Sheets Export
      </h1>

      {/* Tlačítko a popup pro přidání nové row */}
      <div className="flex justify-start w-full">
        <button
          className="btn btn-primary text-white"
          onClick={() =>
            (
              document.getElementById("add_new_modal") as HTMLDialogElement
            )?.showModal()
          }
        >
          Přidat nový záznam
        </button>
      </div>

      {/* Popup */}
      <dialog id="add_new_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
          {/* Content */}
          <form onSubmit={addRecord}>
            <h1 className="text-2xl font-bold text-green-600">
              Přidat nový záznam
            </h1>
            <div className="flex flex-col gap-4 mt-8">
              <label className="flex flex-col gap-2">
                <span className="block label-text">Kód</span>
                <input
                  type="text"
                  name="code"
                  className="input input-bordered"
                  required
                  placeholder="Kód"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Předmět</span>
                <input
                  type="text"
                  name="item"
                  className="input input-bordered"
                  placeholder="Předmět"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Klient</span>
                <input
                  type="text"
                  name="client"
                  className="input input-bordered"
                  placeholder="Klient"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">IČO</span>
                <input
                  type="text"
                  name="identificationNumber"
                  className="input input-bordered"
                  placeholder="IČO"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Město</span>
                <input
                  type="text"
                  name="city"
                  className="input input-bordered"
                  placeholder="Město"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">PSČ</span>
                <input
                  type="text"
                  name="zipCode"
                  className="input input-bordered"
                  placeholder="PSČ"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Klient - telefon</span>
                <input
                  type="text"
                  name="clientPhone"
                  className="input input-bordered"
                  placeholder="Klient - telefon"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Klient - e-mail</span>
                <input
                  type="text"
                  name="clientEmail"
                  className="input input-bordered"
                  placeholder="Klient - e-mail"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Kontaktní osoba</span>
                <input
                  type="text"
                  name="contactPerson"
                  className="input input-bordered"
                  placeholder="Kontaktní osoba"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">
                  Kontaktní osoba - telefon
                </span>
                <input
                  type="text"
                  name="contactPersonPhone"
                  className="input input-bordered"
                  placeholder="Kontaktní osoba - telefon"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">
                  Kontaktní osoba - e-mail
                </span>
                <input
                  type="text"
                  name="contactPersonEmail"
                  className="input input-bordered"
                  placeholder="Kontaktní osoba - e-mail"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Vlastník</span>
                <input
                  type="text"
                  name="owner"
                  className="input input-bordered"
                  placeholder="Vlastník"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Otevřeno od</span>
                <input
                  type="text"
                  name="openedFrom"
                  className="input input-bordered"
                  placeholder="Otevřeno od"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Stav</span>
                <input
                  type="text"
                  name="status"
                  className="input input-bordered"
                  placeholder="Stav"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Konečná cena</span>
                <input
                  type="text"
                  name="endPrice"
                  className="input input-bordered"
                  placeholder="Konečná cena"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Základní cena</span>
                <input
                  type="text"
                  name="basicPrice"
                  className="input input-bordered"
                  placeholder="Základní cena"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Marže (%)</span>
                <input
                  type="text"
                  name="margin"
                  className="input input-bordered"
                  placeholder="Marže (%)"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Kategorie</span>
                <input
                  type="text"
                  name="category"
                  className="input input-bordered"
                  placeholder="Kategorie"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Vedoucí zakázky</span>
                <input
                  type="text"
                  name="contractManager"
                  className="input input-bordered"
                  placeholder="Vedoucí zakázky"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Kraj</span>
                <input
                  type="text"
                  name="county"
                  className="input input-bordered"
                  placeholder="Kraj"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Fakturace</span>
                <input
                  type="text"
                  name="billing"
                  className="input input-bordered"
                  placeholder="Fakturace"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Zdroj</span>
                <input
                  type="text"
                  name="source"
                  className="input input-bordered"
                  placeholder="Zdroj"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Předpokládané náklady</span>
                <input
                  type="text"
                  name="estimatedCost"
                  className="input input-bordered"
                  placeholder="Předpokládané náklady"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="block label-text">Předpokládaný zisk</span>
                <input
                  type="text"
                  name="estimatedProfit"
                  className="input input-bordered"
                  placeholder="Předpokládaný zisk"
                />
              </label>
              <div className="flex justify-center mt-4">
                <button type="submit" className="btn btn-primary text-white">
                  Přidat
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>

      {/* <p className="text-gray-600">Sheet title: {title}</p> */}

      <div className="w-full overflow-x-auto mt-8">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onClick={selectAllRows}
                    defaultChecked={selectedRows !== null}
                  />
                </label>
              </th>
              {/* <th></th> */}
              <th>Kód</th>
              <th>Předmět</th>
              <th>Klient</th>
              <th>IČO</th>
              <th>Město</th>
              <th>PSČ</th>
              <th>Klient - telefon</th>
              <th>Klient - e-mail</th>
              <th>Kontaktní osoba</th>
              <th>Kontaktní osoba - telefon</th>
              <th>Kontaktní osoba - e-mail</th>
              <th>Vlastník</th>
              <th>Otevřeno od</th>
              <th>Stav</th>
              <th>Konečná cena</th>
              <th>Základní cena</th>
              <th>Marže (%)</th>
              <th>Kategorie</th>
              <th>Vedoucí zakázky</th>
              <th>Kraj</th>
              <th>Fakturace</th>
              <th>Zdroj</th>
              <th>Předpokládané náklady</th>
              <th>Předpokládaný zisk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index + 1}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onClick={() => selectRow(row)}
                      defaultChecked={
                        selectedRows !== null &&
                        selectedRows.findIndex((r) => r.code === row.code) !==
                          -1
                      }
                    />
                  </label>
                </th>
                {/* <th>{index + 1}</th> */}
                <td className="text-nowrap">{row.code}</td>
                <td className="text-nowrap">{row.item}</td>
                <td className="text-nowrap">{row.client}</td>
                <td className="text-nowrap">{row.identificationNumber}</td>
                <td className="text-nowrap">{row.city}</td>
                <td className="text-nowrap">{row.zipCode}</td>
                <td className="text-nowrap">{row.clientPhone}</td>
                <td className="text-nowrap">{row.clientEmail}</td>
                <td className="text-nowrap">{row.contactPerson}</td>
                <td className="text-nowrap">{row.contactPersonPhone}</td>
                <td className="text-nowrap">{row.contactPersonEmail}</td>
                <td className="text-nowrap">{row.owner}</td>
                <td className="text-nowrap">{row.openedFrom}</td>
                <td className="text-nowrap">{row.status}</td>
                <td className="text-nowrap">{row.endPrice}</td>
                <td className="text-nowrap">{row.basicPrice}</td>
                <td className="text-nowrap">{row.margin}</td>
                <td className="text-nowrap">{row.category}</td>
                <td className="text-nowrap">{row.contractManager}</td>
                <td className="text-nowrap">{row.county}</td>
                <td className="text-nowrap">{row.billing}</td>
                <td className="text-nowrap">{row.source}</td>
                <td className="text-nowrap">{row.estimatedCost}</td>
                <td className="text-nowrap">{row.estimatedProfit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-center mt-8">
        <button
          className="btn btn-secondary text-white"
          onClick={() => {
            exportData(selectedRows);
          }}
        >
          Exportovat
        </button>
      </div>
    </div>
  );
}
