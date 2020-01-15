~~~

indices = random.sample(list(range(1, 100)), 10)
indices

for x in range(len(indices)):
    print(f"Making request number: {x} for ID: {indices[x]}")

~~~
