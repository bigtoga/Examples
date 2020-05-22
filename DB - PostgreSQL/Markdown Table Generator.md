~~~
DO $$
DECLARE  
   RowsToGenerate INT := 10;
   CurrentValue INT := 1;  
   RowOutput VARCHAR(256) := '| % |  | %';
   FinalOutput VARCHAR(2048) := '';
   TableHeader VARCHAR(128) := '
| Step | √ | Requirement |
| :---: | :---: | :--- ';
   
BEGIN
	FinalOutput := TableHeader;
	
	WHILE CurrentValue <= RowsToGenerate
		LOOP
			FinalOutput := CONCAT(FinalOutput, '
| ', CurrentValue, ' | | ');
			
			CurrentValue := CurrentValue + 1;
		END LOOP;
   
	RAISE NOTICE '% % %', E'\n', FinalOutput, E'\n';
END $$;
~~~
