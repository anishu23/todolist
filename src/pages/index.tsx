import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Header from "@/pages/header";
import ToDoList from "./tablebody";
import Pagination from "./paginationControls";
import ToDoHeader from "./tableHeader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function Home() {
  
  const [listItems, updateList] = useState<any[]>([]);
  const [selectedPageSize, setPageSize] = useState<number>(10);
  const [pagNumbers, setPageNumbers] = useState<number[]>([1]);
  const [selectedPageNumber, setPageNumber] = useState<number>(1);
  const [isReRender, forceReRender] = useState<boolean>(true);

  useEffect(() => {
    renderTable();
  })

  function renderTable() {
    if(isReRender) {
      fetchToDoData().then(res => {
        let todoList:any[] = [];
        if(res && res.todos && res.todos.length > 0) {
            todoList = [...res.todos];
        } else {
            todoList = [];
        }
        updateList(todoList);
        forceReRender(false);
      });  
    }
    
  }
  
  async function fetchToDoData() {
    try {
        let pageNumbers = [];
        let skip = (selectedPageNumber-1) * selectedPageSize;
        console.log(skip);
        const res = await fetch(`https://dummyjson.com/todos?limit=${selectedPageSize}&skip=${skip}`)
        const data = await res.json();
        if(data && data.total > 0) {
            let count = data.total / selectedPageSize;
            for(let i=1;i<=count;i++) {
                pageNumbers.push(i);
            }
            if(data.total % selectedPageSize != 0) {
                pageNumbers.push(Math.floor(count)+1);
            }
            if(selectedPageNumber > pageNumbers[pageNumbers.length-1]) {
              setPageNumber(pageNumbers[pageNumbers.length-1])
            }
            setPageNumbers(pageNumbers);
        }
        return data;
    } catch (err) {
        console.log(err);
    }
  }
  
  function handlePageSizeChange(e: any) {
    setPageSize(e.target.value);
    forceReRender(true);
  }
  function handlePageNumberChange(e: any) {
    setPageNumber(e.target.value);
    forceReRender(true);
  }

  return (
    <>
      <Head>
        <title>Dummy To Do List</title>
        <meta name="description" content="Dummy To Do List Application. Created using next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <div className={styles.page}>
          <Header />

          <div className={styles.container}>
            <div>
              <table className={styles.table}>
                <ToDoHeader></ToDoHeader>
                <ToDoList todoList={listItems} />
              </table>
            </div>
            <Pagination
              pagNumbers={pagNumbers}
              selectedPageNumber={selectedPageNumber}
              selectedPageSize={selectedPageSize}
              handlePageNumberChange={handlePageNumberChange}
              handlePageSizeChange={handlePageSizeChange}
            />

          </div>
        </div>
      </div>
    </>
  );
}
