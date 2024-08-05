"use client"
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet"


export const SheetProvider =()=>{
    return(
        <>
        <NewAccountSheet/>
        <NewTransactionSheet/>
        </>
    )
}