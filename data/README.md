# Put any data files in this folder

Ideally your data is a CSV file.

*Do not commit personally identifying or confidential data!*
If you do so, it is a pain to remove it later and it may have already been crawled by other sources. But [here is how you do so](https://help.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository).


We have two main files that we got from [The Woke Windows Project](https://www.wokewindows.org/).

The first is complaints_officers.csv which details every complaint that the BPD has recieved about an officer and information about that complaint. For example, what officer is receiving the complaint, what type of complaint it was, status of the complaint (on going, unfounded, sustained, etc.), and information about the action taken for the complaint. 

The second is officers.csv which is a list of all officers in the BPD and information about them. For example, salary in 2019, rank, neighborhood, years on the force, number of sustained allegations, IA score (score developed by Woke Windows, go to their website to get more information), etc. 

We decided to comb and filter our data through Excel, as we already had to do this to help prep our visuals for Tableau. 

Our first filtered file is officersfiltered.csv which removes any officers that are not active, do not have a badge number, any duplicated (most recent instance is kept), and any officer that did not have a listed salary.

We then used 4 filtered csv files to get the count for values in the pie charts. 

pie_cc_find.csv we counted the findings for all citizens complaints. 

pie_ii_find.csv we counted the findings for all internal investigations. 

pie_cc_act.csv we counted the actions for all sustained citizens complaints.  

pie_ii_act.csv we counted the actions for all sustained internal investigations. 