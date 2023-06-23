import React from 'react'
import { Plus } from 'lucide-react'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

type CreateRowDialogueProps = {
  children: React.ReactNode
  openDialogue: boolean
  setOpenDialogue: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateRowDialogue: React.FC<CreateRowDialogueProps> = ({
  children,
  openDialogue,
  setOpenDialogue,
}) => {
  return (
    <Dialog onOpenChange={setOpenDialogue} open={openDialogue}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add row
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Please, fill all necessary information</DialogTitle>
          <DialogDescription>
            Make changes to your data here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
