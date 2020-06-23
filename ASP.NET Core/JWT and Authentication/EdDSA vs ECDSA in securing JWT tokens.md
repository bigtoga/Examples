# Spurces:
- [History of ECDSA and why it works like it does](https://crypto.stackexchange.com/questions/64826/why-ecdsa-has-its-form/64852#64852)
   - tl;dr “To get around existing patents”
   - https://en.wikipedia.org/wiki/EdDSA
- https://crypto.stackexchange.com/questions/58380/ecdsa-eddsa-and-ed25519-relationship-compatibility
- https://cryptobook.nakov.com/digital-signatures/eddsa-and-ed25519
- Source: https://www.scottbrady91.com/C-Sharp/EdDSA-for-JWT-Signing-in-dotnet-Core

# Elliptical Curve Digital Signing Algorithm

Public key / Private key cryptography is fairly straightforward:
1. Create your private key
1. Create your public key
1. Create a signature with the private key 
4. Validate the signature using the public key 

If we add specifics related to ECDSA, it looks more like this:
1. Create a private key (a 160-bit or larger integer depending on desired key size)
1. Create a public key
1. Create a signature using the private key using mathematical functions where `z` = SHA1 hash of the data/file/message, `R = k*G` and `S= k^-1(z + dA*R) mod p` 
   - *k* is a random number that is (a) randomly generated and (b) there should be no way that someone can guess, calculate, or use a timing attack or any other type of attack in order to find the random value
   - The **signature** is 40 bytes
      - First 20 bytes = *R*
      - Second 20 bytes = *S* 
   
1. Validate the signature using the public key
   - Calculate `z` as the SHA1 hash of the data/file/message
   - Calculate integer `u<sub>1</sub> = S<sup>-1</sup>z mod n` where `n` is the subgroup of Numbers available in the chosen bit length
   - Calculate integer  `u<sub>2</sub> = S<sup>-1</sup>r mod n`
   - Calculate the point on the curve using `P = u<sub>1</sub>G + u<sub>2</sub>H` where `H` is the public key and `G` is the base of the sub group of numbers available in the chosen bit length
   - The signature is valid it `r = xP mod n`
   
### Weaknesses in ECDSA
If someone was able to guess/calculate this random number, they would be able to generate the private key for themselves 
- The Sony PlayStation 3 hacks were later found to be that hackers were able to regenerate Sony’s private key because Sony used the same value for *k* everywhere. Due to how ECDSA signature validation works, 

ECDSAs are most common and Windows supports them. Edwards Curve are newer (as of June 2020) and Windows does not support them out of the box but can.

Great article complete with python examples here: https://andrea.corbellini.name/2015/05/30/elliptic-curve-cryptography-ecdh-and-ecdsa/
- Explains how the Sony hack occurred - basically hackers bought just two games and, from their signatures, they noticed that `r` was identical for both. They then knew that `k` was the same for both and they worked out `k`

# Difference between nonce creation strategies

Private key + signature + data 

ECDSA uses a random nonce (no more than once) that is generated *per signature*. Failure to only ever use a nonce value once makes the private key easily recoverable, and this has been seen in the wild with both Sony’s Playstation 3 and Bitcoin. With the Playstation 3, the private key was recovered due to a static nonce, and with Bitcoin, we saw Android users affected due to a bug in the Java SecureRandom class on Android.

EdDSA only uses random values *during private key creation*, and the signatures it creates are deterministic, meaning the same private key combined with the same data will produce the same signature every time. 

EDDSA uses the **Edwards form** of elliptical curves