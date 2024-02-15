import os
import shutil
import json5

p = 'C:\\Projects\\in-character-web\\public\\results\\final\\'

keys = ['questionnaire', 'agent-type', 'agent-llm', 'eval-method', 'assessor-llm', 'repeat-times', 'file-name']
data = [[], [], [], [], [], [], []]
folders = []

eval_method_mapping = {
  'Self Reported': 'choose',
  'Self Reported - CoT': 'choosecot',
  'Option Conversion': 'interview_convert',
  'Dimensional-Specific Option Conversion': 'interview_convert_adjoption_anonymous',
  'Expert Rating - Batch': 'interview_assess_batch_anonymous',
  'Expert Rating': 'interview_assess_collective_anonymous'
}


def check_add(i, v):
    if v not in data[i]:
        data[i].append(v)


for d in os.listdir(p):
    fp = os.path.join(p, d)
    if not os.path.isdir(fp):
        continue
    if len(os.listdir(fp)) == 0:
        os.removedirs(fp)
        continue
    print(d)
    folders.append(d)
    check_add(0, d.split('_agent-type=')[0])
    d = d.split('_agent-type=')[1]
    check_add(1, d.split('_agent-llm=')[0])
    d = d.split('_agent-llm=')[1]
    check_add(2, d.split('_eval-method=')[0])
    d = d.split('_eval-method=')[1]
    em = d.split('_repeat-times=')[0]
    if em.endswith('-gpt-4'):
        check_add(4, 'gpt-4')
        em = em[:-6]
    elif em.endswith('-gpt-3.5'):
        check_add(4, 'gpt-3.5')
        em = em[:-8]
    elif em.endswith('-gemini'):
        check_add(4, 'gemini')
        em = em[:-7]
    if em.endswith('-'):
        print('\nF:')
        print(d)
        em = em[:-1]
    if em == 'choosecot2':
        if not os.path.exists(fp.replace('choosecot2', 'choosecot')):
            os.mkdir(fp.replace('choosecot2', 'choosecot'))
        for file in os.listdir(fp):
            fpf = os.path.join(fp, file)
            shutil.move(fpf, fpf.replace('choosecot2', 'choosecot'))
        os.removedirs(fp)
        print('\nchoosecot2:')
        print(fp)
        print('')
    for k, v in eval_method_mapping.items():
        if em == v:
            em = k
            break
    check_add(3, em)
    check_add(5, d.split('_repeat-times=')[1])
    for file in os.listdir(fp):
        check_add(6, file)

print('')
print(keys)
print(data)

allow = []
for s0 in data[0]:
    for s1 in data[1]:
        for s2 in data[2]:
            for s3 in data[3]:
                for s4 in data[4]:
                    for s5 in data[5]:
                        fn = f'{s0}_{keys[1]}={s1}_{keys[2]}={s2}_{keys[3]}={eval_method_mapping[s3]}-{s4}_{keys[5]}={s5}'
                        if fn in folders:
                            i0 = -1
                            for a0 in allow:
                                if a0['value'] == s0:
                                    i0 = allow.index(a0)
                            if i0 == -1:
                                i0 = len(allow)
                                allow.append({'key': keys[0], 'value': s0, 'list': []})

                            i1 = -1
                            for a1 in allow[i0]['list']:
                                if a1['value'] == s1:
                                    i1 = allow[i0]['list'].index(a1)
                            if i1 == -1:
                                i1 = len(allow[i0]['list'])
                                allow[i0]['list'].append({'key': keys[1], 'value': s1, 'list': []})

                            i2 = -1
                            for a2 in allow[i0]['list'][i1]['list']:
                                if a2['value'] == s2:
                                    i2 = allow[i0]['list'][i1]['list'].index(a2)
                            if i2 == -1:
                                i2 = len(allow[i0]['list'][i1]['list'])
                                allow[i0]['list'][i1]['list'].append({'key': keys[2], 'value': s2, 'list': []})

                            i3 = -1
                            for a3 in allow[i0]['list'][i1]['list'][i2]['list']:
                                 if a3['value'] == s3:
                                     i3 = allow[i0]['list'][i1]['list'][i2]['list'].index(a3)
                            if i3 == -1:
                                i3 = len(allow[i0]['list'][i1]['list'][i2]['list'])
                                allow[i0]['list'][i1]['list'][i2]['list'].append({'key': keys[3], 'value': s3, 'list': []})

                            i4 = -1
                            for a4 in allow[i0]['list'][i1]['list'][i2]['list'][i3]['list']:
                                if a4['value'] == s4:
                                    i4 = allow[i0]['list'][i1]['list'][i2]['list'][i3]['list'].index(a4)
                            if i4 == -1:
                                i4 = len(allow[i0]['list'][i1]['list'][i2]['list'][i3]['list'])
                                allow[i0]['list'][i1]['list'][i2]['list'][i3]['list'].append({'key': keys[4], 'value': s4, 'list': []})

                            i5 = -1
                            for a5 in allow[i0]['list'][i1]['list'][i2]['list'][i3]['list'][i4]['list']:
                                if a5['value'] == s5:
                                    i5 = allow[i0]['list'][i1]['list'][i2]['list'][i3]['list'][i4]['list'].index(a5)

                            files = os.listdir(p + fn)
                            if i5 == -1 and len(files) > 0:
                                i5 = len(allow[i0]['list'][i1]['list'][i2]['list'][i3]['list'][i4]['list'])
                                allow[i0]['list'][i1]['list'][i2]['list'][i3]['list'][i4]['list'].append({'key': keys[5], 'value': s5, 'list': files})


print('')
print(json5.dumps(allow, indent=4))


