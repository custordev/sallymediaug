/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-hot-toast';
import { createPhotoCategory } from '@/actions/photos';


interface AddEventCategoryFormProps {
  onSuccess: () => void;
}

export function AddEventCategoryForm({ onSuccess }: AddEventCategoryFormProps) {
  const { register, handleSubmit, reset } = useForm<{ title: string }>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { title: string }) => {
    setLoading(true);
    try {
      await createPhotoCategory({ ...data, slug: data.title.toLowerCase().replace(/ /g, '-') });
      toast.success('Event category created successfully!');
      reset();
      onSuccess();
    } catch (error) {
      toast.error('Failed to create event category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            {...register('title', { required: true })}
            className="col-span-3"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event Category'}
        </Button>
      </div>
    </form>
  );
}

