## 📰 Chapter 5 Deepspeed-Chat SFT 实践 📰

### 🐼 环境安装

```bash
pip install deepspeed>=0.9.0

pip install -r requirements.txt
pip install -e .
```

### 🐼 数据预处理

在数据处理代码文件[raw_datasets.py](dschat/utils/data/raw_datasets.py)及[data_utils.py](dschat/utils/data/data_utils.py)(新版代码路径与教材中有所不同)中增加对新增数据的处理。

### 🐼 自定义模型
虽然 Deepspeed-Chat 内置了在各项评估上都表现良好的 Llama-2 7B 模型，但是由于模型在 预训练中并没有在足够的中文数据上训练，因此其中文能力并不强。当需要使用支持中文的预训练 模型，或者更换其他模型时，就需要对 Deepspeed-Chat 进行相应的更改来适配其他自定义的模型。对[main.py](training/step1_supervised_finetuning/main.py)进行修改来导入相应的模型并在[training_scripts](training/step1_supervised_finetuning/training_scripts)修改对应训练脚本。


### 🐼 模型训练
  ```bash
  # 在路径 training/step1_supervised_finetuning 下运行, 示例中在一台 8 卡 Nvidia A100 机器下进行训练 
  CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7 bash training/step1_supervised_finetuning/training_scripts/baichuan/run_baichuan_7b.sh
   ```

  ### 🐼 模型推理
  当模型训练完成后，可以使用 DeepSpeed-Chat 路径下进行推理。参数修改为已训练好的模 型路径，具体执行方式如下:
  ```bash
  # chat.py
  CUDA_VISIBLE_DEVICES=0 python chat.py --path model_path
   ```