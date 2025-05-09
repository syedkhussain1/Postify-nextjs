import { ChangeEvent, useState } from 'react';
import { useChat } from 'ai/react';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';
import styles from './postgenerator.module.css';
import Image from 'next/image';

const PostGenerator = () => {
  const [postText, setPostText] = useState('');
  const [tone, setTone] = useState('casual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [character, setCharacter] = useState('Normal');
  const [platform, setPlatform] = useState('General');

  const { handleInputChange, handleSubmit } = useChat({
    api: '/api/gpt',
    onFinish: (message) => {
      setError('');

      let generatedTweetContent = message.content;
      // Remove hashtags from the generated tweet
      generatedTweetContent = generatedTweetContent?.replace(/#[\w]+/g, '');
      setGeneratedPost(generatedTweetContent);
      setLoading(false);
    },
    onError: (error) => {
      setError(`An error occurred calling the OpenAI API: ${error}`);
      setLoading(false);
    }
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    handleSubmit(event);
    setDisableSubmitButton(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src="/Logo_small.png" alt="SuperViral.ai logo" width="200" height="200" />
        <h1>Generate your new post using Postify</h1>
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="bioInput" className={styles.label}>1. Enter your topic or interest</label>
        <textarea
          id="bioInput"
          className={styles.textarea}
          rows={4}
          placeholder="Enter whatever you like & let the magic happen"
          value={postText}
          onChange={(e) => {
            setPostText(e.target.value);
            handleInputChange({
              ...e,
              target: {
                ...e.target,
                value: `Generate a ${tone} ${platform} post in the style of ${character} about ${e.target.value}.`
              }
            });
            setDisableSubmitButton(false);
          }}
          disabled={loading}
        />

        <label htmlFor="vibeSelect" className={styles.label}>2. Select your response style</label>
        <select
          id="vibeSelect"
          className={styles.select}
          onChange={(e) => {
            const event = e as unknown as ChangeEvent<HTMLInputElement>;
            setTone(event.target.value);
            handleInputChange({
              ...event,
              target: {
                ...event.target,
                value: `Generate a ${e.target.value} ${platform} post about ${postText}.`
              }
            });
            setDisableSubmitButton(false);
          }}
          disabled={loading}
        >
          <option value="casual">Casual</option>
          <option value="funny">Funny</option>
          <option value="inspirational">Inspirational</option>
          <option value="professional">Professional</option>
        </select>

        <label htmlFor="platformSelect" className={styles.label}>3. Select your platform</label>
        <select
          id="platformSelect"
          className={styles.select}
          value={platform}
          onChange={(e) => {
            setPlatform(e.target.value);
            handleInputChange({
              target: {
                value: `Generate a ${tone} ${e.target.value} post in the style of ${character} about ${postText}.`
              }
            } as ChangeEvent<HTMLInputElement>);
            setDisableSubmitButton(false);
          }}
          disabled={loading}
        >
          <option value="General">General</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="X">X</option>
          <option value="TikTok">TikTok</option>
        </select>

        <label htmlFor="characterSelect" className={styles.label}>4. Select a response character</label>
        <select
          id="characterSelect"
          className={styles.select}
          value={character}
          onChange={(e) => {
            setCharacter(e.target.value);
            handleInputChange({
              target: {
                value: `Generate a ${tone} ${platform} post in the style of ${e.target.value} about ${postText}.`
              }
            } as ChangeEvent<HTMLInputElement>);
            setDisableSubmitButton(false);
          }}
          disabled={loading}
        >
          <option value="Normal">Normal</option>
          <option value="DonaldTrumph">Donald Trump</option>
          <option value="JimCarrey">Jim Carrey</option>
          <option value="NelsonMandela">Nelson Mandela</option>
          <option value="DarthVader">Darth Vader</option>
        </select>

        <button className={styles.button} type="submit" disabled={disableSubmitButton || loading}>
          {loading ? 'Generating...' : 'Generate your tweet →'}
        </button>
      </form>
      {loading && <LoadingSpinner />}
      {error && <p className={styles.error}>{error}</p>}
      {generatedPost && <Post post={generatedPost} />}
    </div>
  );
};

export default PostGenerator;