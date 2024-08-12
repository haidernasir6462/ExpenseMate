"use client"
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"


export const SheetProvider =()=>{
    return(
        <>
        <NewAccountSheet/>
        <NewCategorySheet/>
        </>
    )
}