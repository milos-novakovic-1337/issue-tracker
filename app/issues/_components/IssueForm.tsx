'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField, TextFieldInput } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

// const SimplMDE = dynamic(
//     () => import('react-simplemde-editor'), 
//     { ssr: false}
// );

type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
    issue?: Issue
}

const IssueForm = ({ issue }: { issue?: Issue}) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const submitFunction = handleSubmit(async (data) => 
    { 
        try 
        { 
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occurred.');

        }
    });
    return (
        <div className="max-w-xl">
          {error && (
            <Callout.Root color="red" className="mb-5">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <form className="space-y-3" onSubmit={submitFunction}>
            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.title}
                placeholder="Title"
                {...register('title')}
              />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description}
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>
              {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
              {isSubmitting && <Spinner />}
            </Button>
          </form>
        </div>
      );
    };

export default IssueForm