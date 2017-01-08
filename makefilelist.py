import os
import glob
allfiles=glob.glob('images/*.png')
allfiles=[f.replace('images/','') for f in allfiles]
print(allfiles,'\n',len(allfiles))
f1=open('AMfiles.txt','w')
f2=open('AFfiles.txt','w')
f3=open('PMfiles.txt','w')
f4=open('PFfiles.txt','w')
for f in allfiles:
    fs=f.split('_')[1]
    if fs=='am':
        f1.write(f + ' ')
    elif fs=='af':
        f2.write(f + ' ')
    elif fs=='pm':
        f3.write(f + ' ')
    elif fs=='pf':
        f4.write(f + ' ')

    print(fs)
f1.close()
f2.close()
f3.close()
f4.close()