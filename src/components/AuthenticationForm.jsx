import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,

  Button,
  Divider,
  Checkbox,
  Anchor,
  createStyles,
} from '@mantine/core';
import SocialButton from './SocialButton.jsx';
import { BrandGoogle, BrandTwitter } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    root: {
        width:"50vw",
    },
  }));

export function AuthenticationForm(props) {
  const { classes } = useStyles();
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });
  console.log(classes)
  return (
    <Paper className=" w-4/5 md:w-1/2" radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Bus Tracker, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <SocialButton icon={<BrandGoogle size={18}/>} text={"Login with Google"}/>
        <SocialButton icon={<BrandTwitter size={18}/>} text={"Login with Twitter"}/>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Group direction="column" grow>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}