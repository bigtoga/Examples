# Print the number of films that they were in
x = response_json["films"]
dacount = 0
for y in x:
    dacount+=1 

print(f'There are {dacount} files')

