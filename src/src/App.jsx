import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PuzzlePage() {
  const navigate = useNavigate();
  const answer = 'REACT';
  const scrambled = useMemo(() => answer.split('').sort(() => 0.5 - Math.random()).join(''), []);
  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');

  function check() {
    if (guess.toUpperCase() === answer) navigate('/form');
    else setError('Try again!');
  }

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-indigo-700 text-center">Unscramble the Word</h1>
      <div className="text-5xl font-mono text-center tracking-widest text-gray-800 animate-pulse">{scrambled}</div>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded"
        placeholder="Your guess"
        value={guess}
        onChange={(e) => { setGuess(e.target.value); setError(''); }}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="text-center">
        <button onClick={check} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded">Next</button>
      </div>
    </div>
  );
}

function UserFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '' });

  function submit(e) {
    e.preventDefault();
    navigate('/second-game');
  }

  return (
    <form onSubmit={submit} className="space-y-4 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700">Your Info</h2>
      <label className="block">Name<input required className="w-full border px-3 py-2 rounded" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></label>
      <label className="block">Email<input type="email" required className="w-full border px-3 py-2 rounded" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/></label>
      <label className="block">Password<input type="password" required className="w-full border px-3 py-2 rounded" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/></label>
      <label className="block">Age<input type="number" min="1" required className="w-full border px-3 py-2 rounded" value={form.age} onChange={(e)=>setForm({...form,age:e.target.value})}/></label>
      <button type="submit" className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded">Next</button>
    </form>
  );
}

function SecondGamePage() {
  const navigate = useNavigate();
  const target = Math.floor(Math.random() * 20) + 1;
  const [guess, setGuess] = useState('');
  const [msg, setMsg] = useState('');

  function check() {
    const n = Number(guess);
    if (n === target) navigate('/secure');
    else setMsg(n > target ? 'Too high!' : 'Too low!');
  }

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-teal-600 text-center">Guess the Number (1‑20)</h2>
      <input type="number" className="w-full border px-3 py-2 rounded" value={guess} onChange={(e)=>{setGuess(e.target.value); setMsg('');}} />
      {msg && <p className="text-yellow-600 text-center">{msg}</p>}
      <div className="text-center">
        <button onClick={check} className="px-6 py-2 bg-indigo-600 text-white rounded">Submit</button>
      </div>
    </div>
  );
}

function FinalPage() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ ssn: '', apiKey: '' });

  function submit(e) {
    e.preventDefault();
    setDone(true);
  }

  return done ? (
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg"><h3 className="text-xl text-green-600">All done! Thanks.</h3></div>
  ) : (
    <form onSubmit={submit} className="space-y-4 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700">Secure Info</h2>
      <label className="block">SSN<input pattern="\\d{3}-\\d{2}-\\d{4}" required className="w-full border px-3 py-2 rounded" placeholder="123-45-6789" value={form.ssn} onChange={(e)=>setForm({...form,ssn:e.target.value})}/></label>
      <label className="block">API Key<input required className="w-full border px-3 py-2 rounded" placeholder="*************" value={form.apiKey} onChange={(e)=>setForm({...form,apiKey:e.target.value})}/></label>
      <button type="submit" className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded">Submit</button>
    </form>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <motion.div className="w-full" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}>
        <Routes>
          <Route path="/" element={<PuzzlePage />} />
          <Route path="/form" element={<UserFormPage />} />
          <Route path="/second-game" element={<SecondGamePage />} />
          <Route path="/secure" element={<FinalPage />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}
