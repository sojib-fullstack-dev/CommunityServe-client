'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';

type BtnProfileProps = {
  defaultName?: string;
};

const BtnProfile = ({ defaultName = '' }: BtnProfileProps) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    if (!name) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        throw new Error(error.message || 'Failed to update profile');
      }

      toast.success('Profile name updated');
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Edit profile name"
              title="Edit profile name"
              className="text-[#065F46] hover:bg-[#E8F2EE] hover:text-[#F97316]"
            >
              <Pencil className="size-4" />
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue={defaultName}
                  required
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BtnProfile;
