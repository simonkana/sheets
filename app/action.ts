"use server"

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { ExportData } from "@/types/ExportData";

const serviceAccountAuth = new JWT({
    email: "penb-admin@penb-admin.iam.gserviceaccount.com",
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWA7Q/1Nap1Um8\nIammP2xW9EES0Q3/c0Wuq7GmJps3SjTP7XVNIeLtgvzu9P/t6gAi65nWHK06DECm\nx+7M6H2PP7M5Q/j+8OoG59wEIhCcfrSWq05kXZhCEG+EH+4DwoeybZO4HlJ97COk\nVTXEC7P0zct0AF89oLJOfoISIsjD3pnJdPtBdP/d9uyG51zuYnB4fIvwI8Yn8Soa\np69iKB3fAVuadYKyIWLvxjvseig099VuAOiQORfDM6fk7hnJieBivDOztN6hqKfH\npP+QqJCP/aFeWDBguqg0X4tfMpvsJsS5hMnX3MIeOv5x0qKDzwn1vo6bBhhPTmdV\nezSTdOn7AgMBAAECggEAGIM3b1y4d5zjWmCdHONtMRI4FeU00S0v/Dg6+ZLXtw5N\nmJJNIhLrm/LU9g5GSZp8djhNoA0kiIEwXpr53DVl2u6bkGZufT4MMkpYYGaD6gZ8\nPMh2MUk9PsJPw+UHGp8tVuG34GnirIfVqnMaq35cDqBCt/by7m+Kje/3EhPpVAk/\nXpjHeiyDzS3C6HRKgU+CuZkB/CMEvnXKyHJFL7cMP7W7sPY68hXwWX/eN0tufXcy\nE/10OyjZbhcvY6ognFTtZ3+ZFpvShg04Nyc7/NAksPNK084vcXvxi9O+C5iFtXFd\n3qAJnkUZoi4r/8ej7mI+95IXknRlzd6X6XtZCEA1WQKBgQDN+XHpw70jcmlrhv5c\nu7jmxUfXCR/ZQo9nml17XaapvS+VG6/qxOeJbD05BPNBXELCh2b7lVl4KuMecdDl\nVPoZGH61FBZg+4k3N7Qmv/Esc2bKqIfvh7WuKC9DLRUiRg4gpwy8I/Sw3rV/g7lg\nI53K3KkDYEC15K6cOeH056wqqQKBgQC6cuylraw+WCjvdTOjgYGWQ4WUueO/WDgT\nIPEGSGI74l/qdNQ72uSp+aewW9sFuhaA7etpB+ZtJt5I+N93Y0DOFLhAUyfQEvh+\nx/bsbLVlFONXdHWkPBo7ZAveeDdlvIKE0+4vSFq8hC/LV1bb1BwhKSWxTlGIPprL\nXW+mGYlaAwKBgGqHE5JKaPz3RGyXceC2OigoakJd9rngAdkcbjLKudLaBM0Cd9Zd\nJj7d20AtPj5UoDaJ3wpJMO/EhpiNVvP1IjBuicHPdM+N6GbFiYftB6fsu4Ie7cdF\nkgJTyDXfECocv1vF6gE4O2pqlMYxc2O0p/xuaX9UfcNVVbV4/lMyqsmZAoGARqyN\ne3fLlI5CZhJdEptijZzmo6ua4ssD5mxUMHd7lQuIJA1I7a9Zgfy6TaVj7lXNde25\nkESIWdOj6rE7s7uRswwzk15x9vNZ8mTF+nRyhfBXBK2Gcky9/Mk9noSfKxc7ujHD\nVXTtwAuzOjbPG+DZENDSEtWHHkfs0S2HxsRjRhUCgYEAkWpnJAZqD9wr/v3Mhm3N\nFDLLzQMZQpvtHVik6oxdhAb33txkQfb3TzNFBO57Gd408frs6umq0SFE812gV7VA\niE1DQIx2hGbCy7k/yeFYALmmPbmHu8mC2damW/Me4Ff5mxJEWmocUREokOpVulWw\n2s5azE/oOWALF+ZYd8WC/a8=\n-----END PRIVATE KEY-----\n",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
    "1HtFsOTeypc0m45AvpuY062MAFllvuwbthFku0Wy6y84",
    serviceAccountAuth
);

export async function init() {
    await doc.loadInfo();
    return doc.title;
}

export async function getRows() {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const data: ExportData[] = rows.map((row) => {
        return {
            code: row.get("Kód"),
            item: row.get("Předmět"),
            client: row.get("Klient"),
            identificationNumber: row.get("IČO"),
            city: row.get("Město"),
            zipCode: row.get("PSČ"),
            clientPhone: row.get("Klient - telefon"),
            clientEmail: row.get("Klient - e-mail"),
            contactPerson: row.get("Kontaktní osoba"),
            contactPersonPhone: row.get("Kontaktní osoba - telefon"),
            contactPersonEmail: row.get("Kontaktní osoba - e-mail"),
            owner: row.get("Vlastník"),
            openedFrom: row.get("Otevřeno od"),
            status: row.get("Stav"),
            endPrice: row.get("Konečná cena"),
            basicPrice: row.get("Základní cena"),
            margin: row.get("Marže (%)"),
            category: row.get("Kategorie"),
            contractManager: row.get("Vedoucí zakázky"),
            county: row.get("Kraj"),
            billing: row.get("Fakturace"),
            source: row.get("Zdroj"),
            estimatedCost: row.get("Předpokládané náklady"),
            estimatedProfit: row.get("Předpokládaný zisk"),
        };
    });
    return data;
}

export async function addRows(rows: any) {
    await doc.loadInfo();
    rows.map((row: any) => {
        row["Kód"] = row.code;
        row["Předmět"] = row.item;
        row["Klient"] = row.client;
        row["IČO"] = row.identificationNumber;
        row["Město"] = row.city;
        row["PSČ"] = row.zipCode;
        row["Klient - telefon"] = row.clientPhone;
        row["Klient - e-mail"] = row.clientEmail;
        row["Kontaktní osoba"] = row.contactPerson;
        row["Kontaktní osoba - telefon"] = row.contactPersonPhone;
        row["Kontaktní osoba - e-mail"] = row.contactPersonEmail;
        row["Vlastník"] = row.owner;
        row["Otevřeno od"] = row.openedFrom;
        row["Stav"] = row.status;
        row["Konečná cena"] = row.endPrice;
        row["Základní cena"] = row.basicPrice;
        row["Marže (%)"] = row.margin;
        row["Kategorie"] = row.category;
        row["Vedoucí zakázky"] = row.contractManager;
        row["Kraj"] = row.county;
        row["Fakturace"] = row.billing;
        row["Zdroj"] = row.source;
        row["Předpokládané náklady"] = row.estimatedCost;
        row["Předpokládaný zisk"] = row.estimatedProfit;
    });
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRows(rows)
}