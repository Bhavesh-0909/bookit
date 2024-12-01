'use client'
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [aadhar, setAadhar] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  const handleotp = async () => {
    const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email';
    const options = {
      method: 'POST',
      headers: {'X-Api-Key': '3ee606d3-aa0c-4873-afeb-9dea9d686926', 'Content-Type': 'application/json'},
      body: `{"email":${email}}`
    }
    
    try {
      const response = await fetch(url, options);
      setToken(response.token);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const connectToPetra = async () => {
    try {
      if (!window.aptos) {
        alert("Petra Wallet is not installed. Please install it from https://petra.app/");
        return;
      }

      // Request connection to Petra Wallet
      const response = await window.aptos.connect();
      if (response) {
        setWalletAddress(response.address);
        console.log("Connected account:", response.address);
      }
    } catch (error) {
      console.error("Error connecting to Petra Wallet:", error);
    }
  };

  const verifyOtp = async () => {
    const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email/verify';
    const options = {
      method: 'POST',
      headers: {'X-Api-Key': '3ee606d3-aa0c-4873-afeb-9dea9d686926', 'Content-Type': 'application/json'},
      body: `{"email":${email},"otp":${otp},"token":${token}}`
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const signUp = async () => {
    if(!walletAddress) {
      alert("Please connect your wallet first");
      return;
    }
    if(!email && !otp && !aadhar && !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to sign up for an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button className="self-baseline" onClick={handleotp}>Send OTP</Button>
          </div>
          

          <div className="grid gap-2">
            <Label htmlFor="Otp">Otp</Label>
            <Input
              id="Otp"
              type="text"
              placeholder="123456"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="aadhar">Aadhar</Label>
            <Input
              id="aadhar"
              type="text"
              placeholder="xxxxxxxxxxxx"
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>

            <div className="grid gap-2">
            <Button onClick={connectToPetra} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Connect Wallet
            </Button>
            {walletAddress && (
              <div className="mt-2 p-2 bg-gray-100 rounded text-center">
                <span className="block text-lg font-semibold">{`${walletAddress?.slice(0, 10)}...`}</span>
              </div>
            )}
            </div>

          <Button type="submit" onClick={signUp} className="w-full">
            Sign Up
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
