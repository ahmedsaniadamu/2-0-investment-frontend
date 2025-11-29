'use client'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const SearchInput: React.FC<{
  placeHolder?: string,
  search?: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}> = ({placeHolder, search, setSearch}) => {

  const [searchInit, setSearchInit] = React.useState('')

  return (
    <React.Fragment>
          <Input
                 value={searchInit}
        className={'max-[500px]:w-full mb-2'}
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                    if(e.target.value === '') setSearch('')
                    setSearchInit(e.target.value)
                  } }
                  type="search"
                  placeholder={placeHolder}
                />
      <Button onClick={() => setSearch(searchInit)} className='h-12 max-[500px]:h-16 max-[500px]:w-full bg-white md:ml-2' variant="outline">
            <Search /> Search
        </Button>
    </React.Fragment>
  )
}

export default SearchInput