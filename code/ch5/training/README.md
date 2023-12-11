# Training Experiences
It's important to note that training large language models (LLMs) and Reinforcement Learning from Human Feedback (RLHF) are still open problems with many unknowns. DeepSpeed-Chat aims to provide an end-to-end RLHF training pipeline with efficient and fast system support, rather than a comprehensive solution for RLHF training. As this field is relatively new, there are various unknowns for both users and developers.

Users are encouraged to experiment with the pipeline, provide feedback, and make suggestions. Contributions to the project are welcome when users find something useful and tested for their use cases. By working together, we can advance the development of this project and improve our understanding of LLMs and RLHF training.

## Three Training Steps Discussion
### Step 1: Supervised Finetuning
Supervised fine-tuning (SFT) has indeed made significant progress in the field of large language models (LLMs). However, unexpected behaviors such as repeating content generation and inconsistency between perplexity (PPL) scores and generation capabilities can still occur.

Based on our testing, there are several terms that affect the generation behavior:
* ```weight decay```: OPT models are pretrained with weight decay. Following that, finetuning normally inherits this setting. However, it may not produce the desired model. Particularly, for our OPT-1.3B example, we disabled weight decay.
* ```dropout```: Similar as above, dropout is used in OPT pretraining. However, SFT may not necessarily need it. Particularly, for our OPT-1.3B example, we enabled dropout.
* ```dataset```: Using more data usually provides better model quality. But if the sources of datasets are too different, it may hurt the performance. For our OPT-1.3B example, we use the following four datasets: ```Dahoas/rm-static Dahoas/full-hh-rlhf Dahoas/synthetic-instruct-gptj-pairwise yitingxie/rlhf-reward-datasets```.
* ```training epochs``` Normally, to avoid overfitting, we choose smaller training epochs instead of longer epochs if smaller epochs can achieve similar model quality (in this case, we use PPL as an indicator). However, similar to InstructGPT pointed, we found even though we got overfitting due to longer training, it is still recommended to use longer training epochs to get better generation quality. Particularly, for our OPT-1.3B example, we use 16 epochs even though we found that 1 or 2 epochs training can reach the same PPL score.

### About our testing
We did most of our accuracy/quality testing on OPT-1.3B (SFT and Actor model) and OPT-350m (RW and Critic model). Particularly, we used the 16 V100-32G (DGX-2 node) GPUs to run our experiments.

The hyperparameters included in our scripts are based on our own testing. Therefore, it may not work for your case when (but not limited to): (1) a different number of GPUs, (2) different model sizes, (3) different model families, etc.

Also note that you could find even better training configurations/recipes than what we provided. We did not extensively test all hyperparameter combinations due to resource constraints.

### Training logs
We are sharing our training logs for all three steps for an OPT-1.3b actor and OPT-350m critic trained with x16-V100-32GB GPUs:

| Step         | Run Script     | Training Log |
|--------------|-----------|------------|
| 1 | [opt/single_node/run_1.3b.sh](https://github.com/microsoft/DeepSpeedExamples/blob/master/applications/DeepSpeed-Chat/training/step1_supervised_finetuning/training_scripts/opt/single_node/run_1.3b.sh) | [opt-1.3b-globalBatchSize128.log](https://github.com/microsoft/DeepSpeedExamples/blob/master/applications/DeepSpeed-Chat/training/step1_supervised_finetuning/training_log_output/opt-1.3b-globalBatchSize128.log) |
| 2 | [opt/single_node/run_350m.sh](https://github.com/microsoft/DeepSpeedExamples/blob/master/applications/DeepSpeed-Chat/training/step2_reward_model_finetuning/training_scripts/opt/single_node/run_350m.sh) |  [opt-350m_globalBatchSize-64.log](https://github.com/microsoft/DeepSpeedExamples/blob/master/applications/DeepSpeed-Chat/training/step2_reward_model_finetuning/training_log_output/opt-350m_globalBatchSize-64.log) |
| 3 | [opt/single_node/run_1.3b.sh](https://github.com/microsoft/DeepSpeedExamples/blob/master/applications/DeepSpeed-Chat/training/step3_rlhf_finetuning/training_scripts/single_node/opt/run_1.3b.sh) | [actor_opt-1.3b_critic_opt-350m_globalBatchSize64.log](https://github.com/microsoft/DeepSpeedExamples/blob/master/applications/DeepSpeed-Chat/training/step3_rlhf_finetuning/training_log_output/actor_opt-1.3b_critic_opt-350m_globalBatchSize64.log) |

### Characterization Scripts
Scripts for sweeping training across various parameters (Zero Stage, Offload, Lora, etc) are available for Step 1, 2, and 3. These scripts can be further extended to sweep across additional parameters such as learning rate.

| Step         | Sweep Script     | README |
|--------------|-----------|-----------|
| 1 | [run_step1_sweep.sh](./step1_supervised_finetuning/training_scripts/opt/single_node/sweep/run_step1_sweep.sh) | [README](./step1_supervised_finetuning/training_scripts/opt/single_node/sweep/README.md) |
| 2 | [run_step2_sweep.sh](./step2_reward_model_finetuning/training_scripts/opt/single_node/sweep/run_step2_sweep.sh) | [README](./step2_reward_model_finetuning/training_scripts/opt/single_node/sweep/README.md) |
| 3 | [run_step3_sweep.sh](./step3_rlhf_finetuning/training_scripts/opt/single_node/sweep/run_step3_sweep.sh) | [README](./step3_rlhf_finetuning/training_scripts/opt/single_node/sweep/README.md) |

### Others
RLHF (Reinforcement Learning for Human Feedback) training is still an open problem, and DeepSpeed-Chat is designed to be a starting point for researchers and practitioners to work on it with an efficient and fast training experience. The Hybrid-Engine and other efficient components, like LoRA, can be inherited from DeepSpeed-Chat, allowing you to develop your own RLHF training pipeline for exploration, research, and other purposes.

Contributions from users are highly appreciated to build a more successful, easier-to-use, and more stable RLHF training pipeline together.
