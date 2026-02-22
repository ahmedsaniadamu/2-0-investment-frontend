'use client'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const SearchInput: React.FC<{
  placeHolder?: string,
  search?: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}> = ({ placeHolder, search, setSearch }) => {

  const [searchInit, setSearchInit] = React.useState('')

  return (
    <div className="relative w-full">
      <Input
        value={searchInit}
        className="w-full pr-28 h-14 max-[500px]:h-14 bg-white"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === '') setSearch('')
          setSearchInit(e.target.value)
        }}
        type="search"
        placeholder={placeHolder}
      />
      <Button
        onClick={() => setSearch(searchInit)}
        className="absolute right-1 top-1 h-10 max-[500px]:h-12 flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default SearchInput